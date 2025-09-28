  import { useRouter } from 'expo-router';
  import React, { useEffect, useState } from 'react';
  import { useColorScheme } from 'nativewind';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Flag, CheckCircle, Circle } from 'lucide-react-native';
import ProgressBar from '@/components/exam/progressBar';
import Timer from '@/components/exam/timer';
import Question from '@/components/exam/question';
import StudyActions from '@/components/exam/studyactions';
import QuestionDrawer from '@/components/exam/questionDrawer';
import NoteModal from '@/components/exam/NotesModel';
import FlashcardModal from '@/components/exam/flashcardMode';
import { supabase } from '@/lib/supabase';
import { AppModal } from '@/components/ui/modal';

interface Exam {
    id: number;
    year_of_exam: number;
  subject_id: number;
  subjects?: { name: string };
  duration?: number;
}

interface Question {
  id: number;
  question: string;
  choice_a: string;
  choice_b: string;
  choice_c: string;
  choice_d: string;
  answer: string;
  explanation?: string;
}

export default function ExamScreen({ route }: any) {
  const params = useLocalSearchParams();
  const exam = React.useMemo(() => {
    let examObj: Exam | null = null;
    if (route?.params?.exam) {
      let examRaw = route.params.exam;
      console.log('ExamScreen route.params:', route.params);
      if (typeof examRaw === 'string') {
        try {
          examObj = JSON.parse(examRaw);
          console.log('Parsed exam from route.params:', examObj);
        } catch (e) {
          console.log('Failed to parse exam from route.params:', e);
          examObj = null;
        }
      } else {
        examObj = examRaw;
        console.log('Exam object from route.params:', examObj);
      }
    } else if (params.exam) {
      console.log('ExamScreen useLocalSearchParams:', params);
      try {
        examObj = JSON.parse(params.exam as string);
        console.log('Parsed exam from useLocalSearchParams:', examObj);
      } catch (e) {
        console.log('Failed to parse exam from useLocalSearchParams:', e);
        examObj = null;
      }
    }
    // Ensure duration is always a number (minutes)
    if (examObj) {
      if (!examObj.duration || isNaN(Number(examObj.duration))) {
        examObj.duration = 60; // fallback to 60 minutes
      } else {
        examObj.duration = Number(examObj.duration);
      }
    }
    return examObj;
  }, [route?.params?.exam, params.exam]);
  // UI state
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam?.duration ? exam.duration * 60 : 3600); // fallback 60min
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [flashcardModalVisible, setFlashcardModalVisible] = useState(false);
  const [isSubmitModalVisible, setSubmitModalVisible] = React.useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      if (!exam?.id) return setLoading(false);
      const { data: questionsData, error } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', exam.id)
        .order('id');
      setQuestions(questionsData || []);
      setLoading(false);
    };
    fetchQuestions();
  }, [exam]);

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

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color="#5CACEE" />
      </View>
    );
  }
  if (!exam) {
    return (
      <View className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'}`}>
        <Text className="text-white text-xl">Exam not found.</Text>
      </View>
    );
  }
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const leftCount = totalQuestions - answeredCount;
  const flaggedCount = flaggedQuestions.size;
  const progress = totalQuestions > 0 ? answeredCount / totalQuestions : 0;

  // Handlers
  const handleSaveQuestion = () => {
    if (!currentQuestion) return;
    const questionToSave = {
      id: currentQuestion.id,
      questionText: currentQuestion.question,
      options: [currentQuestion.choice_a, currentQuestion.choice_b, currentQuestion.choice_c, currentQuestion.choice_d],
    //   correctAnswer: currentQuestion.answer,
      correctAnswer: typeof currentQuestion.answer === 'number' ? currentQuestion.answer : parseInt(currentQuestion.answer, 10),
    };
    setSavedQuestions(prev => {
      const exists = prev.find(q => q.id === questionToSave.id);
      if (exists) return prev;
      return [...prev, questionToSave];
    });
    Alert.alert('Success', 'Question saved successfully!');
  };
  const handleSaveNote = (content: string) => {
    if (!currentQuestion) return;
    const newNote = {
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      content,
      createdAt: new Date(),
    };
    setNotes(prev => [...prev, newNote]);
    setNoteModalVisible(false);
    Alert.alert('Success', 'Note saved successfully!');
  };
  const handleSaveFlashcard = (front: string, back: string) => {
    if (!currentQuestion) return;
    const newFlashcard = {
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
  const getQuestionStatus = (index: number) => {
    if (index === currentQuestionIndex) return 'current';
    if (flaggedQuestions.has(index)) return 'flagged';
    if (answers[index] !== undefined) return 'answered';
    return 'unanswered';
  };
  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };
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
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setDrawerVisible(false);
  };
  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

const confirmSubmit = async () => {
  setSubmitModalVisible(false);
  setIsExamFinished(true);

  // Get user id
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    Alert.alert('Error', 'User not authenticated.');
    return;
  }

  // Fetch latest questions from DB for accurate grading
  const { data: latestQuestions, error: fetchError } = await supabase
    .from('questions')
    .select('id, answer')
    .eq('exam_id', exam.id);
  if (fetchError || !latestQuestions) {
    Alert.alert('Error', 'Could not fetch latest questions.');
    return;
  }
// helper to convert "A" -> 0, "B" -> 1, etc.
const mapLetterToIndex = (letter: string) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
  return alphabet.indexOf(letter.toUpperCase()); // returns 0 for A, 1 for B, etc.
};

  // Prepare answers JSON using DB answers
  const answersJson: Record<number, string> = {};
  let rightCount = 0;
latestQuestions.forEach((q, idx) => {
  const selected = answers[idx]; // number (0,1,2,...)
  if (selected !== undefined) {
    let correctAnswer: number;

    if (typeof q.answer === 'number') {
      correctAnswer = q.answer; // already a number
    } else if (!isNaN(parseInt(q.answer as string, 10))) {
      correctAnswer = parseInt(q.answer as string, 10); // numeric string "0","1"
    } else {
      correctAnswer = mapLetterToIndex(q.answer as string); // "A","B","C"
    }

    if (selected === correctAnswer) {
      answersJson[q.id] = 'right';
      rightCount++;
    } else {
      answersJson[q.id] = 'wrong';
    }
  }
});


  // Calculate score
  const totalQuestionsCount = latestQuestions.length;
  const result = totalQuestionsCount > 0 ? Math.round((rightCount / totalQuestionsCount) * 100) : 0;

  // Time taken
  const timeTaken = exam && typeof exam.duration === 'number' ? (exam.duration * 60 - timeLeft) : (3600 - timeLeft);

  // ✅ Save exam result (including time_taken + result)
  const { error: resultError } = await supabase.from('exam_results').insert({
    user_id: user.id,
    exam_id: exam.id,
    answers: answersJson,
    result: Number(result),
    time_taken: typeof timeTaken === 'number' ? timeTaken : 0,
    completed_at: new Date().toISOString(),
  });

  if (resultError) {
    console.error('Error saving exam result:', resultError.message);
  }

  // Save saved questions
  for (const sq of savedQuestions) {
    await supabase.from('saved_questions').insert({
      user_id: user.id,
      question_id: sq.id,
    });
  }

  // Save notes
  for (const note of notes) {
    await supabase.from('notes').insert({
      user_id: user.id,
      question_id: note.questionId,
      content: note.content,
    });
  }

  // Save flashcards
  for (const fc of flashcards) {
    await supabase.from('flashcards').insert({
      user_id: user.id,
      question_id: fc.questionId,
      front: fc.front,
      back: fc.back,
    });
  }

  // Navigate to results page
  const router = useRouter();
  router.push({ pathname: '/exam/result', params: { examId: exam.id } });
};



  // UI
  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'}`}> 
      {/* Header */}
      <View className={`flex-row items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-[#23272f] border-b border-[#23272f]' : 'bg-white border-b border-gray-200'}`}> 
        <TouchableOpacity className="p-2" onPress={() => setDrawerVisible(true)}>
          <Menu size={24} color={isDarkMode ? '#a5b4fc' : '#333'} />
        </TouchableOpacity>
        <Text className={`text-lg font-semibold flex-1 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{exam.subjects?.name} Exam {exam.year_of_exam}</Text>
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
        {currentQuestion ? (
          <Question
            question={{
              id: currentQuestion.id,
              text: currentQuestion.question,
              options: [currentQuestion.choice_a, currentQuestion.choice_b, currentQuestion.choice_c, currentQuestion.choice_d],
              correctAnswer: typeof currentQuestion.answer === 'number' ? currentQuestion.answer : parseInt(currentQuestion.answer, 10),
            }}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onFlag={handleFlag}
            isFlagged={flaggedQuestions.has(currentQuestionIndex)}
          />
        ) : (
          <Text className="text-gray-400">No questions found for this exam.</Text>
        )}
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
          <TouchableOpacity className="py-3 px-6 rounded-lg bg-green-500" onPress={() => setSubmitModalVisible(true)}>
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
          questions={questions.map(q => ({
            id: q.id,
            text: q.question,
            options: [q.choice_a, q.choice_b, q.choice_c, q.choice_d],
            correctAnswer: typeof q.answer === 'number' ? q.answer : parseInt(q.answer, 10),
          }))}
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
        questionText={currentQuestion ? currentQuestion.question : ''}
      />
      {/* Flashcard Modal */}
      <FlashcardModal
        visible={flashcardModalVisible}
        onClose={() => setFlashcardModalVisible(false)}
        onSave={handleSaveFlashcard}
        questionText={currentQuestion ? currentQuestion.question : ''}
      />
      <AppModal visible={isSubmitModalVisible} onClose={() => setSubmitModalVisible(false)}>
  <View>
    <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
      Submit Exam
    </Text>
    <Text style={{ marginBottom: 20 }}>
      Are you sure you want to submit? You have answered {answeredCount} out of {totalQuestions} questions.
    </Text>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Pressable
        onPress={() => setSubmitModalVisible(false)}
        style={{ marginRight: 15 }}
      >
        <Text style={{ color: 'blue' }}>Cancel</Text>
      </Pressable>
      <Pressable onPress={confirmSubmit}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Submit</Text>
      </Pressable>
    </View>
  </View>
</AppModal>

    </SafeAreaView>
  );
}
