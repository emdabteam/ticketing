import axios from "axios";

export default ({ req }) => {
  if (typeof window === 'undefined') {
    //we are on the server
    // request should be made to http://ingress-nginx
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we are in the browser
    // request could be made with a base url of microservice
    return axios.create({
      baseURL: '/'
    });
  }
};