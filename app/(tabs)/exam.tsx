import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Clock, Flag, CheckCircle, Circle } from 'lucide-react-native';
import { examData, QuestionStatus } from '@/components/exam/data';
import FlashcardModal from '@/components/exam/flashcardMode';
import Question from '@/components/exam/question';
import Timer from '@/components/exam/timer';
import QuestionDrawer from '@/components/exam/questionDrawer';
import NoteModal from '@/components/exam/NotesModel';
import StudyActions from '@/components/exam/studyactions';
import ProgressBar from '@/components/exam/progressBar';
import { useColorScheme } from 'nativewind';

export interface SavedQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
}

export interface Note {
  id: string;
  questionId: number;
  content: string;
  createdAt: Date;
}

export interface Flashcard {
  id: string;
  questionId: number;
  front: string;
  back: string;
  createdAt: Date;
}
export default function ExamScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60); // Convert minutes to seconds
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [flashcardModalVisible, setFlashcardModalVisible] = useState(false);

  const currentQuestion = examData.questions[currentQuestionIndex];
  const totalQuestions = examData.questions.length;
  const answeredCount = Object.keys(answers).length;
  const leftCount = totalQuestions - answeredCount;
  const flaggedCount = flaggedQuestions.size;

  // Handle save question
  const handleSaveQuestion = () => {
    const questionToSave: SavedQuestion = {
      id: currentQuestion.id,
      questionText: currentQuestion.text,
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
    };
    
    setSavedQuestions(prev => {
      const exists = prev.find(q => q.id === questionToSave.id);
      if (exists) return prev;
      return [...prev, questionToSave];
    });
    
    Alert.alert('Success', 'Question saved successfully!');
  };

  // Handle save note
  const handleSaveNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      content,
      createdAt: new Date(),
    };
    
    setNotes(prev => [...prev, newNote]);
    setNoteModalVisible(false);
    Alert.alert('Success', 'Note saved successfully!');
  };

  // Handle save flashcard
  const handleSaveFlashcard = (front: string, back: string) => {
    const newFlashcard: Flashcard = {
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      front,
      back,
      createdAt: new Date(),
    };
    
    setFlashcards(prev => [...prev, newFlashcard]);
    setFlashcardModalVisible(false);
    Alert.alert('Success', 'Flashcard created successfully!');
  };
  // Get question status for each question
  const getQuestionStatus = (index: number): QuestionStatus => {
    if (index === currentQuestionIndex) return 'current';
    if (flaggedQuestions.has(index)) return 'flagged';
    if (answers[index] !== undefined) return 'answered';
    return 'unanswered';
  };

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Toggle flag for current question
  const handleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  // Navigate to specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setDrawerVisible(false);
  };

  // Navigate to next question
  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Navigate to previous question
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Submit exam
  const handleSubmit = () => {
    Alert.alert(
      'Submit Exam',
      `Are you sure you want to submit? You have answered ${answeredCount} out of ${totalQuestions} questions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          style: 'destructive',
          onPress: () => {
            setIsExamFinished(true);
            // Here you would typically send the answers to a server
            Alert.alert('Exam Submitted', 'Your exam has been submitted successfully!');
          }
        }
      ]
    );
  };

  // Timer effect
  useEffect(() => {
    if (isExamFinished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExamFinished(true);
          Alert.alert('Time Up!', 'Your exam has been auto-submitted.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isExamFinished]);

  // Progress based on answered questions
  const progress = totalQuestions > 0 ? answeredCount / totalQuestions : 0;

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'}`}> 
      {/* Header */}
      <View className={`flex-row items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-[#23272f] border-b border-[#23272f]' : 'bg-white border-b border-gray-200'}`}> 
        <TouchableOpacity className="p-2" onPress={() => setDrawerVisible(true)}>
          <Menu size={24} color={isDarkMode ? '#a5b4fc' : '#333'} />
        </TouchableOpacity>
        <Text className={`text-lg font-semibold flex-1 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{examData.title}</Text>
        <Timer timeLeft={timeLeft} />
      </View>

      {/* Progress Bar */}
      <View className="px-4 pt-2">
        <ProgressBar progress={progress} />
      </View>

      {/* Exam Info */}
      <View className={`flex-row justify-around py-3 ${isDarkMode ? 'bg-[#23272f] border-b border-[#23272f]' : 'bg-white border-b border-gray-200'}`}> 
        <View className="flex-row items-center">
          <CheckCircle size={16} color="#10B981" />
          <Text className={`ml-1 text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Answered: {answeredCount}</Text>
        </View>
        <View className="flex-row items-center">
          <Circle size={16} color={isDarkMode ? '#a5b4fc' : '#6B7280'} />
          <Text className={`ml-1 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Left: {leftCount}</Text>
        </View>
        <View className="flex-row items-center">
          <Flag size={16} color="#F59E0B" />
          <Text className={`ml-1 text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Flagged: {flaggedCount}</Text>
        </View>
      </View>

      {/* Question Content */}
      <View className="flex-1 p-4">
        <Question
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onFlag={handleFlag}
          isFlagged={flaggedQuestions.has(currentQuestionIndex)}
        />
      </View>

      {/* Study Actions */}
      <View className="px-4 pb-2">
        <StudyActions
          onSaveQuestion={handleSaveQuestion}
          onTakeNote={() => setNoteModalVisible(true)}
          onCreateFlashcard={() => setFlashcardModalVisible(true)}
        />
      </View>

      {/* Navigation Buttons */}
      <View className={`flex-row justify-between px-4 py-3 ${isDarkMode ? 'bg-[#23272f] border-t border-[#23272f]' : 'bg-white border-t border-gray-200'}`}> 
        <TouchableOpacity
          className={`py-3 px-6 rounded-lg border ${isDarkMode ? 'border-[#23272f] bg-[#23272f]' : 'border-gray-300 bg-white'} ${currentQuestionIndex === 0 ? 'opacity-50' : ''}`}
          onPress={goToPrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text className={`text-base font-medium ${currentQuestionIndex === 0 ? (isDarkMode ? 'text-gray-600' : 'text-gray-400') : (isDarkMode ? 'text-gray-200' : 'text-gray-700')}`}>Previous</Text>
        </TouchableOpacity>

        {currentQuestionIndex === totalQuestions - 1 ? (
          <TouchableOpacity className="py-3 px-6 rounded-lg bg-green-500" onPress={handleSubmit}>
            <Text className="text-base font-semibold text-white">Submit Exam</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="py-3 px-6 rounded-lg bg-blue-500" onPress={goToNext}>
            <Text className="text-base font-semibold text-white">Next</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Drawer Modal */}
      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDrawerVisible(false)}
      >
        <QuestionDrawer
          questions={examData.questions}
          currentIndex={currentQuestionIndex}
          getQuestionStatus={getQuestionStatus}
          onQuestionSelect={goToQuestion}
          onClose={() => setDrawerVisible(false)}
          savedQuestions={savedQuestions}
          notes={notes}
          flashcards={flashcards}
        />
      </Modal>

      {/* Note Modal */}
      <NoteModal
        visible={noteModalVisible}
        onClose={() => setNoteModalVisible(false)}
        onSave={handleSaveNote}
        questionText={currentQuestion.text}
      />

      {/* Flashcard Modal */}
      <FlashcardModal
        visible={flashcardModalVisible}
        onClose={() => setFlashcardModalVisible(false)}
        onSave={handleSaveFlashcard}
        questionText={currentQuestion.text}
      />
    </SafeAreaView>
  );
}

// Tailwind styles applied via className