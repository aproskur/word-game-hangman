'use client'
import styles from "./page.module.css";
import WordGame from './components/WordGame'
import React from 'react';
import { WordGameProvider } from './contexts/WordGameContext';


export default function Home() {
  return (
    <main className={styles.main}>
      <WordGameProvider>
        <WordGame />
      </WordGameProvider>
    </main>
  );
}
