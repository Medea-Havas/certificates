import React from 'react';
import StudentsSectionInfo from '../../../components/Students_Section_Info';
import StudentsSectionCourses from '../../../components/Students_Section_Courses';
import styles from '../../../styles/Course.module.css';
import { useState } from 'react';
import StudentsHeader from '../../../components/Students_Header';
import { useRouter } from 'next/router';

export default function Student() {
  const [index, setIndex] = useState(0);
  const handleIndex = index => setIndex(index);
  const router = useRouter();
  const paramId = router.query.id;

  return (
    <>
      <main className={`page ${styles.main}`}>
        <div>
          <StudentsHeader
            index={index}
            handleIndex={handleIndex}
            paramId={paramId}
          />
          {index === 0 && <StudentsSectionInfo />}
          {index === 1 && <StudentsSectionCourses />}
        </div>
      </main>
    </>
  );
}
