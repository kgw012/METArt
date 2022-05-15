import useSWR from 'swr';
import http from './http';

export const fetcher = (url) => http.get(url).then((res) => res.data);

export const getArtList = () => {
  const { data, error } = useSWR(`/art`, fetcher);

  return {
    artList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// export const getArt = (artid) => {
//   const id = String(artid);
//   const { data, error } = useSWR(`/art/${id}`, fetcher);

//   return {
//     art: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };