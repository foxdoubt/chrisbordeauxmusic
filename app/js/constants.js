import landline from '~/app/images/Landline-movie-poster.jpg';
import obviousChild from '~/app/images/Obvious-child-movie-poster.jpg';
import lastTemptation from '~/app/images/last-temptation-of-christ-movie-poster.jpg';

export const thumbnails = {
  landline,
  obviousChild,
  lastTemptation,
};

export const scoreSrcs = [
  {
    name: 'obvious-child',
    titles: [
      'Bathtub',
      'Box',
      'ElevenThirty',
      'Greenpoint',
      'Halloween',
      'Opening',
      'Park_Bench',
      'Recovery',
    ],
  },
  {
    name: 'landline',
    titles: [
      'catskills',
      'coal-fired-train',
      'fossil-fuel-kid',
      'same-side',
    ],
  },
];


export const navItems = [
  'film scores',
  'songs',
  'press',
];

export const defaultAlbumName = 'obvious-child';

export const pathToScores = '/app/site_data/scores';

console.log(pathToScores);

