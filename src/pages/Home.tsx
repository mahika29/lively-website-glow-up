
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Quick Quiz</h1>
        <p className="mt-4 text-xl text-center text-gray-600">
          Create, share, and take quizzes with ease
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
