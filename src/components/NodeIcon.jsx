import { memo } from 'react';
import kafka_server from '../data/kafka_server.png'; 
import rabbit_producer from '../data/rabbit_producer.png';
import rest from '../data/rest.webp' 

function CustomNodeIcon({ nodeType}) {
    var iconSrc
    if (nodeType.startsWith('kafka')) {
      iconSrc = kafka_server
    } else if (nodeType.startsWith('rabbit')) {
      iconSrc = rabbit_producer
    } else if (nodeType.startsWith('rest')) {
        iconSrc = rest
    }
    return (
      <img class="inline rounded-full w-12 h-12 flex justify-center items-center bg-gray-100" src={iconSrc} />
    )
  }

export default memo(CustomNodeIcon);