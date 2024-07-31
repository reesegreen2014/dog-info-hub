import React from 'react';
import './OwnerResources.css'
import trainingImg from '../../images/Training.webp';
import bodyLanguage from '../../images/BodyLanguage.jpg';
import animalAbuseImg from '../../images/AnimalAbuse.jpg'

const resources = [
  {
    id: 1,
    title: `How to Train Your Dog`,
    description: `Article on how to train your pup`,
    url: `https://www.thesprucepets.com/steps-to-train-your-dog-1118273`,
    img: trainingImg
  },
  {
    id: 2, 
    title: 'How To Read Dog Body Language',
    description: 'Understanding your dogs body language',
    url: `https://www.akc.org/expert-advice/advice/how-to-read-dog-body-language/`,
    img: bodyLanguage
  },
  {
    id: 3,
    title: '8 Ways to Stop Animal Abuse',
    description: 'Tips and tricks on what you can personally do to stop animal abuse',
    url: 'https://animalcardonation.org/blog/8-ways-how-to-stop-animal-abuse/',
    img: animalAbuseImg
  }
]

function OwnerResources() {
  return (
    <div className='owner-resources-container'>
      <h1>Pet Owner Resources</h1>
      <div className='resources-grid'>
        {resources.map((resource) => (
          <div key={resource.id} className='resource-card'>
            <img src={resource.img} alt={resource.title} className='resource-image' />
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url} target='_blank' rel='noopener noreferrer'>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerResources;