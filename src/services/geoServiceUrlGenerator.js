export default class GeoServiceUrlGenerator {
  get BASE_URL() {return 'https://geo.ipify.org/api/v2'};
  get PATH() {return 'country,city'};
  PARAMS = {
    API_KEY: {
      get name() {return 'apiKey'},
      get value() {return process.env.REACT_APP_IPIFY_API_KEY},
    },
    IP_ADDRESS: function(self) {
      let _value = '';
      return {
        get name() {return 'ipAddress'},
        set value(value) {
          if (self.PARAMS.DOMAIN.value !== '') {
            throw new Error('IP_ADDRESS cannot be set when DOMAIN is not empty');
          }
          _value = value;
        },
        get value() {return _value},
      };
    }(this),
    DOMAIN: function(self) {
      let _value = '';
      return {
        get name() {return 'domain'},
        set value(value) {
          if (self.PARAMS.IP_ADDRESS.value !== '') {
            throw new Error('DOMAIN cannot be set when IP_ADDRESS is not empty');
          }
          _value = value;
        },
        get value() {return _value},
      };
    }(this),
  };
  #getParamString = function({name, value}) {
    return `${name}=${value}`;
  };
  #getParamsString = function(params) {
    return params // [{name:'paramName1', value:'paramValue1'}, {name:'paramName2', value:'paramValue2'}, ...]
      .map(param => this.#getParamString(param)) // ['paramName1=paramValue1', 'paramValue2=paramValue2', ...]
      .join('&'); // 'paramName1=paramValue1&paramValue2=paramValue2&...'
  };
  #getValidParams = function() {
    if (Object.keys(this.PARAMS)[0] !== 'API_KEY') {
      throw new Error('API_KEY must be first in PARAMS'); // This line cannot be tested. Works only if someone move/remove API_KEY.
    }
    return Object.values(this.PARAMS) // [{name:'paramName1', value:'paramValue1'}, {name:'paramName2', value:'paramValue2'}, {name:'paramName3', value:''}, ...]
      .filter(param => param.value !== ''); // [{name:'paramName1', value:'paramValue1'}, {name:'paramName2', value:'paramValue2'}, ...]
  };
  getUrl = function() {
    return `${this.BASE_URL}/${this.PATH}?${this.#getParamsString(this.#getValidParams())}`
  };
}
