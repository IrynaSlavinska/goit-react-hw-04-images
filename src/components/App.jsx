import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

import pixabayAPI from 'services/gallery-api';

import SearchBarForm from './Searchbar/Searchbar';
import CirclesLoader from 'components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    pixabayAPI(query, page)
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
      })
      .catch(error => {
        return Notiflix.Notify.failure('Something went wrong. Try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleMoreClick = () => {
    setPage(prev => prev + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  return (
    <div className="container">
      <SearchBarForm onSubmit={handleFormSubmit} />

      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading && <CirclesLoader />}
      {totalImages > images.length && totalImages && (
        <Button onClick={handleMoreClick} />
      )}
    </div>
  );
};

export default App;

// ! -----------------------------------------------------------------

// class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     totalImages: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//       this.setState(previous => ({
//         isLoading: !previous.isLoading,
//       }));
//       pixabayAPI(query, page)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           return Promise.reject(new Error(`Try again`));
//         })
//         .then(data => {
//           this.setState(previous => ({
//             images: [...previous.images, ...data.hits],
//             totalImages: data.totalHits,
//           }));
//         })
//         .catch(error => {
//           return Notiflix.Notify.failure(
//             'Something went wrong. Try again later'
//           );
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   handleMoreClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleFormSubmit = query => {
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//       totalImages: 0,
//     });
//   };

//   render() {
//     const { images, isLoading, totalImages } = this.state;

//     return (
//       <div className="container">
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {images.length > 0 && <ImageGallery images={images} />}

//         {isLoading && <CirclesLoader />}
//         {totalImages > images.length && totalImages && (
//           <Button onClick={this.handleMoreClick} />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
