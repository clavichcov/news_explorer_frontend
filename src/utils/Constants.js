import line from '../images/line.svg'
import about from '../images/about.jpg'
import github from '../images/Icon/github.png'
import facebook from '../images/Icon/facebook.png'
import notfound from '../images/Icon/notfound.png'
import bookmark_disabled from '../images/Icon/bookmark_disabled.png'
import bookmark_active from '../images/Icon/bookmark_active.png'
import bookmark_selected   from '../images/Icon/bookmark_selected.png'
import close_icon from '../images/Icon/close_icon.png'
import logout_normal from '../images/Icon/logout_normal.png'
import logout_savednews from '../images/Icon/logout_savednews.png'
import cardimg  from '../images/cardimg.png'

export const IMAGES = {
  
  line,
  about,
  facebook,
  github,
  notfound,
  bookmark_disabled,
  bookmark_active,
  bookmark_selected,
  logout_normal,
  logout_savednews,
  cardimg,
  close_icon
};
export const API_CONFIG = {
  
    baseUrl: "/api", // Usa el proxy /api
    baseUrlApi: "/api", // También usa /api
    baseUrlWww: "http://www.newsfinalsprint.chickenkiller.com",
    API_KEY: ""
};
    
  

export const THIRDPARTYAPI_CONFIG = {
  
    BASE_URL: "/newsapi",
    API_KEY: "",
    NEWS_SOURCE: "techcrunch",
  
};


export const THIRDPARTYAPI_ENDPOINTS = {
  TOP_HEADLINES: "/top-headlines",
  EVERYTHING: "/everything",
  SOURCES: "/sources"
};


export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};


export const ERROR_MESSAGES = {
  FETCH_FAILED: "Error al obtener datos de la API",
  INVALID_API_KEY: "API Key inválida",
  NETWORK_ERROR: "Error de conexión"
};
