import React from 'react';
import './OwnerResources.css'

const resources = [
  {
    id: 1,
    title: `How to Train Your Dog`,
    description: `Article on how to train your pup`,
    url: `https://www.thesprucepets.com/steps-to-train-your-dog-1118273`,
    img: './images/Training.webp'
  },
  {
    id: 2, 
    title: 'How To Read Dog Body Language',
    description: 'Understanding your dogs body language',
    url: `https://www.akc.org/expert-advice/advice/how-to-read-dog-body-language/`,
    img: '/images/BodyLanguage.jpg'
  },
  {
    id: 3,
    title: '8 Ways to Stop Animal Abuse',
    description: 'Tips and tricks on what you can personally do to stop animal abuse',
    url: 'https://animalcardonation.org/blog/8-ways-how-to-stop-animal-abuse/',
    img: '/images/AnimalAbuse.jpg'
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