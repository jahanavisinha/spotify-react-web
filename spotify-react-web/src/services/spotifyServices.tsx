// import axios from 'axios';
// import qs from 'qs';
//
// const client_id = process.env.REACT_APP_SPOTIFY_API_ID;
// const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
// const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
//
// const getAuth = async () => {
//     try {
//         const token_url = 'https://accounts.spotify.com/api/token';
//         const data = qs.stringify({'grant_type':'client_credentials'});
//
//         const response = await axios.post(token_url, data, {
//             headers: {
//                 'Authorization': `Basic ${auth_token}`,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });
//         return response.data.access_token;
//     } catch(error) {
//         console.error('Authentication error:', error);
//         throw error;
//     }
// };
//
// const getAudioFeatures_Track = async (track_id: string) => {
//     try {
//         const access_token = await getAuth();
//         const api_url = `https://api.spotify.com/v1/audio-features/${track_id}`;
//         const response = await axios.get(api_url, {
//             headers: {
//                 'Authorization': `Bearer ${access_token}`
//             }
//         });
//         return response.data;
//     } catch(error) {
//         console.error('Error fetching audio features:', error);
//         throw error;
//     }
// };