import { Button, CircularProgress, Input, Select } from '@mui/material';
import React from 'react';
import styles from './CoursesSectionCertificate.module.css';

export default function CoursesSectionCertificate({
  arrayTemplates,
  changeSelectedTemplate,
  imageRef,
  image2Ref,
  loadingTemplates,
  openCertificateImageFile,
  openCertificateImage2File,
  openCertificateThumbnailFile,
  selectedCourse,
  selectedTemplate,
  thumbnailRef,
  update,
  updateImage,
  updateTemplate
}) {
  return (
    <div className={styles.main}>
      <div className={styles.diplomaContainer}>
        <h2>Diploma</h2>
        {loadingTemplates ? (
          <CircularProgress />
        ) : (
          <>
            <div className={styles.diplomaDiv}>
              <div className={styles.imageDiploma}>
                <p className={styles.xsmall}>Miniatura:</p>
              </div>
              {selectedCourse.certificate_thumbnail ? (
                <img
                  src={`${process.env.API_HOST}/assets/certificates/${selectedCourse.certificate_thumbnail}`}
                  className={styles.thumb}
                  alt='Thumbnail'
                />
              ) : (
                <img src='/noimage.png' alt='No image' />
              )}
              <Button
                variant='outlined'
                className={styles.buttonImage}
                onClick={openCertificateThumbnailFile}
              >
                {selectedCourse.certificate_thumbnail
                  ? 'Sustituir'
                  : 'Seleccionar'}
              </Button>
              <Input
                type='file'
                name='certificate_thumbnail'
                className={styles.imageFile}
                ref={thumbnailRef}
                onChange={e => updateImage(e, 'certificate_thumbnail')}
              >
                Insertar imagen
              </Input>
            </div>
            <div className={styles.diplomaDiv}>
              <div className={styles.imageDiploma}>
                <p className={styles.xsmall}>Imagen 1:</p>
              </div>
              {selectedCourse.certificate_image ? (
                <img
                  className={styles.mwidth}
                  src={`${process.env.API_HOST}/assets/certificates/${selectedCourse.certificate_image}`}
                  alt='Certificate image 01'
                />
              ) : (
                <img src='/noimage.png' alt='No image' />
              )}
              <Button
                variant='outlined'
                className={styles.buttonImage}
                onClick={openCertificateImageFile}
              >
                {selectedCourse.certificate_image ? 'Sustituir' : 'Seleccionar'}
              </Button>
              <Input
                type='file'
                name='certificate_image'
                className={styles.imageFile}
                ref={imageRef}
                onChange={e => updateImage(e, 'certificate_image')}
              >
                Insertar imagen
              </Input>
            </div>
            <div className={styles.diplomaDiv}>
              <div className={styles.imageDiploma}>
                <p className={styles.xsmall}>Imagen 2:</p>
              </div>
              {selectedCourse.certificate_image2 ? (
                <img
                  className={styles.mwidth}
                  src={`${process.env.API_HOST}/assets/certificates/${selectedCourse.certificate_image2}`}
                  alt='Certificate image 02'
                />
              ) : (
                <img
                  className={styles.mwidth}
                  src='/noimage.png'
                  alt='No image'
                />
              )}
              <Button
                variant='outlined'
                className={styles.buttonImage}
                onClick={openCertificateImage2File}
              >
                {selectedCourse.certificate_image2
                  ? 'Sustituir'
                  : 'Seleccionar'}
              </Button>
              <Input
                type='file'
                name='certificate_image2'
                className={styles.imageFile}
                ref={image2Ref}
                onChange={e => updateImage(e, 'certificate_image2')}
              >
                Insertar imagen
              </Input>
            </div>
            <div className={styles.template}>
              <h3>Plantilla:</h3>
              <Select
                value={selectedTemplate.id}
                onChange={changeSelectedTemplate}
                styles={styles.controlLabel}
              >
                {arrayTemplates}
              </Select>
              {update ? (
                <Button
                  className={styles.updateButton}
                  onClick={e => updateTemplate(e, selectedTemplate.id)}
                >
                  Actualizar
                </Button>
              ) : (
                ''
              )}
              <div className={styles.chosenTemplate}>
                <p>Posiciones:</p>
                <p className={styles.upper}>- Primera página -</p>
                <p className={styles.templateSection}>[Nombre]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[0].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[0].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[0].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[0].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Nº de expediente]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[1].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[1].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[1].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[1].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Fecha]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[2].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[2].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[2].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[2].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Créditos]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[3].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[3].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[3].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[3].split(',')[3]}
                </p>
                <p className={styles.upper}>- Segunda página -</p>
                <p className={styles.templateSection}>[Nombre]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[4].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[4].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[4].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[4].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[NIF]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[5].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[5].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[5].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[5].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Nº expediente]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[6].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[6].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[6].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[6].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Créditos]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[7].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[7].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[7].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[7].split(',')[3]}
                </p>
                <p className={styles.templateSection}>[Horas]</p>
                <p className={styles.templateData}>
                  Top: {selectedTemplate.coords.split('*')[8].split(',')[0]} |
                  Left: {selectedTemplate.coords.split('*')[8].split(',')[1]} |
                  Width: {selectedTemplate.coords.split('*')[8].split(',')[2]} |
                  Font Size:{' '}
                  {selectedTemplate.coords.split('*')[8].split(',')[3]}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
