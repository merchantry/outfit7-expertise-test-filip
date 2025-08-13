import mitt from 'mitt';
import { Events } from './types';

const eventBus = mitt<Events>();

export default eventBus;
