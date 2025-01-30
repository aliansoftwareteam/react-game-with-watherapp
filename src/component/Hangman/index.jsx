import { useCallback, useEffect, useState } from 'react';
import words from './wordList.json';
import HangmanDraw from './HangmanDraw';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import { Toaster, toast } from 'react-hot-toast';

function Hangman() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  function setAWord() {
    setWordToGuess(words[Math.floor(Math.random() * words.length)]);
    setGuessLetters([]);
  }

  const [guessLetters, setGuessLetters] = useState([]);

  // take and filter the letters we guess
  const incorrectLetters = guessLetters.filter(
    letter => !wordToGuess?.word.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess?.word
    .split('')
    .every(letter => guessLetters.includes(letter));

  const addGuessLetter = useCallback((letter) => {
    if (guessLetters.includes(letter) || isLoser || isWinner) {
      return
    } else {
      setGuessLetters(currentLetters => [...currentLetters, letter])
    }
  }, [guessLetters, isLoser, isWinner])

  // keyboard event handler
  useEffect(() => {
    const handler = (e) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) {
        return
      } else {
        e.preventDefault();
        addGuessLetter(key);
      }
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessLetters]);

  useEffect(() => {
    if (isWinner) {
      toast('Congratulations, you won!', {
        icon: '👏',
        duration: 5000
      });
    }
  }, [isWinner]);

  useEffect(() => {
    if (isLoser) {
      toast.error('You lost, please refresh the page!', {
        duration: 5000
      })
    }
  }, [isLoser, wordToGuess]);

  return (
    <div className='h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      {/* RESET WORD */}
      <button className='absolute top-4 right-4 bg-white p-2 rounded-md text-gray-950' onClick={() => setAWord()}>
        New Word
      </button>
      <div className='font-adlam max-w-3xl flex items-center flex-col gap-8 mx-auto h-full justify-center'>
        <Toaster />
        {/* I want to know how many times I chose the wrong letter */}
        <HangmanDraw numberOfGuess={incorrectLetters.length} />
        <div className='text-xl'>
          Hint: {wordToGuess?.hint}
        </div>
        <HangmanWord
          result={isLoser}
          guessLetters={guessLetters}
          wordToGuess={wordToGuess?.word}
        />
        <div className='self-stretch'>
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetter={guessLetters.filter(letter => wordToGuess?.word.includes(letter))}
            inactiveLetter={incorrectLetters}
            addGuessLetter={addGuessLetter}
          />
        </div>
      </div>
    </div>
  )
}

export default Hangman