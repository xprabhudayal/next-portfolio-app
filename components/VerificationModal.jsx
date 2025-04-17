'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function VerificationModal({ isOpen, onClose, onVerify, verificationType }) {
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0 });
  const [answer, setAnswer] = useState('');
  const [isError, setIsError] = useState(false);
  const modalRef = useRef(null);
  
  // Generate random math problem
  useEffect(() => {
    if (isOpen) {
      const num1 = Math.floor(Math.random() * 20) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setMathProblem({ num1, num2 });
      setAnswer('');
      setIsError(false);
    }
  }, [isOpen]);
  
  // Animate modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const expectedAnswer = mathProblem.num1 + mathProblem.num2;
    
    if (parseInt(answer, 10) === expectedAnswer) {
      onVerify();
      setIsError(false);
    } else {
      setIsError(true);
      // Shake animation for error
      gsap.fromTo(modalRef.current, 
        { x: 0 }, 
        { x: [-10, 10, -8, 8, -5, 5, 0], duration: 0.6, ease: 'power3.out' }
      );
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white text-black p-8 rounded-lg w-full max-w-md"
      >
        <h3 className="text-2xl font-medium mb-4">Verify Identity</h3>
        <p className="mb-6">Please solve this simple math problem to {verificationType === 'download' ? 'download the resume' : 'view contact information'}.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-6 text-center">
            <p className="text-xl">
              {mathProblem.num1} + {mathProblem.num2} = ?
            </p>
          </div>
          
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`mb-4 p-3 border ${isError ? 'border-red-500' : 'border-gray-300'} rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Enter your answer"
            required
          />
          
          {isError && (
            <p className="text-red-500 mb-4">Incorrect answer. Please try again.</p>
          )}
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-black text-black hover:bg-black hover:text-white transition-colors rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-md"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}