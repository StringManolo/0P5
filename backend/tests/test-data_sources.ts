import scrapeWikipedia from '../data_sources/wikipedia';
import foro_elhacker_net from '../data_sources/foro_elhacker_net';

(async () => {
  const searchTerm = 'ddos';
  try {
    const wikipediaResult = await scrapeWikipedia(searchTerm);
    console.log(wikipediaResult);
  } catch (error) {
    console.error('Error occurred:', error);
  }

  try {
    const foroElhackerNetResult = await foro_elhacker_net(searchTerm);
    console.log(foroElhackerNetResult);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

