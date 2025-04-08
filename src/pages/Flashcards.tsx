
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, RotateCcw, 
  ThumbsUp, ThumbsDown, Shuffle 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';

const FlashcardsPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  // Find the quiz by ID
  const quiz = quizId ? quizzes.find(q => q.id === quizId) : null;
  
  // If no quizId is provided, show a list of all quizzes
  if (!quizId) {
    return <FlashcardSelection />;
  }
  
  // If quiz is not found, show error
  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Quiz Not Found</h1>
            <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/flashcards">View All Flashcard Sets</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Create flashcards from quiz questions
  const flashcards = quiz.questions.map(question => ({
    front: question.question,
    back: question.options[question.correctAnswer],
    known: false
  }));
  
  return <FlashcardDeck title={quiz.title} flashcards={flashcards} />;
};

// Component to select a flashcard set
const FlashcardSelection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Flashcard Sets</h1>
            <p className="text-gray-600 dark:text-gray-400">Choose a quiz to study with flashcards.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <Card 
                key={quiz.id} 
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => window.location.href = `/flashcards/${quiz.id}`}
              >
                <div className="h-32 bg-gradient-to-br from-quiz-primary/80 to-quiz-accent/80 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white px-4 text-center">{quiz.title}</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded">
                      {quiz.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{quiz.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {quiz.questions.length} cards
                    </div>
                    <Button>
                      Study
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Flashcard deck component
interface Flashcard {
  front: string;
  back: string;
  known: boolean;
}

interface FlashcardDeckProps {
  title: string;
  flashcards: Flashcard[];
}

const FlashcardDeck = ({ title, flashcards: initialFlashcards }: FlashcardDeckProps) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const knownCount = flashcards.filter(card => card.known).length;
  
  // Flip card animation
  const flipCard = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(!showAnswer);
      setTimeout(() => {
        setIsFlipping(false);
      }, 300);
    }, 150);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        flipCard();
      } else if (e.key === 'ArrowRight' || e.key === 'j') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        goToPrevious();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, currentIndex]);
  
  // Go to next card
  const goToNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setShowAnswer(false);
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Go to previous card
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setShowAnswer(false);
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Mark card as known/unknown
  const markCard = (known: boolean) => {
    const updatedCards = [...flashcards];
    updatedCards[currentIndex].known = known;
    setFlashcards(updatedCards);
    
    // Auto advance to next card
    if (currentIndex < flashcards.length - 1) {
      setShowAnswer(false);
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Shuffle remaining cards
  const shuffleCards = () => {
    const remainingCards = flashcards.filter((_, index) => index >= currentIndex);
    const shuffled = [...remainingCards].sort(() => Math.random() - 0.5);
    
    const newDeck = [
      ...flashcards.slice(0, currentIndex),
      ...shuffled
    ];
    
    setFlashcards(newDeck);
    setShowAnswer(false);
  };
  
  // Reset the deck
  const resetDeck = () => {
    setFlashcards(initialFlashcards.map(card => ({ ...card, known: false })));
    setCurrentIndex(0);
    setShowAnswer(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate('/flashcards')} className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Flashcards
            </Button>
            <h1 className="text-3xl font-bold mb-1">{title}</h1>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400">
                Card {currentIndex + 1} of {flashcards.length}
              </p>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">{knownCount} known</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div 
            ref={cardRef}
            className={`relative w-full aspect-[3/2] mx-auto mb-6 cursor-pointer perspective-1000 ${
              isFlipping ? 'pointer-events-none' : ''
            }`}
            onClick={flipCard}
          >
            <div className={`absolute inset-0 transform-style-3d transition-transform duration-300 ${
              showAnswer ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className={`absolute inset-0 backface-hidden bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border flex flex-col ${
                flashcards[currentIndex]?.known ? 'border-green-400 dark:border-green-600' : 'border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="text-xl md:text-2xl font-medium text-center">
                    {currentCard?.front}
                  </h3>
                </div>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Click or tap card to flip
                </div>
              </div>
              
              {/* Back of card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-quiz-primary flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-medium text-center text-quiz-primary">
                    {currentCard?.back}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Navigation buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={goToPrevious} 
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <Button 
                variant="outline" 
                onClick={goToNext}
                disabled={currentIndex === flashcards.length - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={shuffleCards}
                title="Shuffle remaining cards"
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={resetDeck}
                title="Reset deck"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                onClick={() => markCard(false)}
                title="Mark as unknown"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="text-green-500 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950"
                onClick={() => markCard(true)}
                title="Mark as known"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Keyboard shortcuts */}
          <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border text-sm text-gray-500 dark:text-gray-400">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Keyboard shortcuts:</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>Space or Enter: Flip card</div>
              <div>→ or J: Next card</div>
              <div>← or K: Previous card</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlashcardsPage;
