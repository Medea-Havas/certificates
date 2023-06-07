import React, { useEffect } from 'react';
import CoursesSectionInfo from '../../../components/Courses_Section_Info';
import CoursesSectionCertificate from '../../../components/Courses_Section_Certificate';
import CoursesSectionStudent from '../../../components/Courses_Section_Student';
import styles from '../../../styles/Course.module.css';
import CoursesHeader from '../../../components/Courses_Header';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Course() {
  const [index, setIndex] = useState(0);
  const handleIndex = index => setIndex(index);
  const router = useRouter();
  const paramId = router.query.id;

  return (
    <>
      <main className='page main'>
        <div>
          <CoursesHeader
            index={index}
            handleIndex={handleIndex}
            paramId={paramId}
          />
          {index === 0 && <CoursesSectionInfo />}
          {index === 1 && <CoursesSectionCertificate />}
          {index === 2 && <CoursesSectionStudent />}
        </div>
      </main>
    </>
  );
}
