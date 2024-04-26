import io from 'socket.io-client';
import { baseUrl } from './baseUrl';
// const socket = io(`${baseUrl.url}`);
const socket = io('http://192.168.139.77:3000');
export default socket;