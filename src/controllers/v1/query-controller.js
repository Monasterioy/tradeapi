import dotenv from 'dotenv';
import axios from 'axios';
import _ from 'lodash';

dotenv.config();

class QueryController {

async getQuery(req, res){
    const responseTvmaze = await axios.get(`${process.env.TVMAZE_API}${req.params.data}`);
    const responseItunes = await axios.get(`${process.env.ITUNES_API}${req.params.data}&media=ebook`);
    console.log('responseTvmaze',responseTvmaze);
    const dataPrueba = responseItunes.data.results;

    const arrayResponse = [];
    _.map(responseTvmaze.data,(data) =>{
      let origin = 'Tvmaze';
      let type = 'tvshow'
      let summary = data.show.summary;
      if(summary){
        summary = summary.replace(/<[^>]*>?/g, '');
      } 
      arrayResponse.push({
        name: data.show.name,
        url: data.show.url,
        description: summary,
        origin: origin,
        type: type,

      })
    })
    _.map(dataPrueba,(data)=>{
      let origin = 'Itunes'
      if(data.kind === 'feature-movie') {
        let summary = data.longDescription;
        if(summary){
          summary = summary.replace(/<[^>]*>?/g, '');
        } 
        arrayResponse.push({
          name: data.trackName,
          url: data.trackViewUrl,
          description: summary, 
          origin: origin,
          type: 'movie',
        })
      }

      if(data.kind === 'song') {
        arrayResponse.push({
          name: data.artistName,
          url: data.artistViewUrl,
          description: data.collectionCensoredName, 
          origin: origin,
          type: 'song',
        })
      }

      if(data.kind === 'ebook') {
        let summary = data.description;
        if(summary){
          summary = summary.replace(/<[^>]*>?/g, '').replace(/\n/g, '');
        } 
        arrayResponse.push({
          name: data.trackCensoredName,
          url: data.trackViewUrl,
          description: summary, 
          origin: origin,
          type: 'doc',
        })
      }

    })
    res.status(201).send({ status: 'ok', data: arrayResponse});
  };
};

const queryController = new QueryController();
export default queryController;