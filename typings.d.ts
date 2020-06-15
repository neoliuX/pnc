/// <reference path="./node_modules/vuex/types/index.d.ts" />
/// <reference path="./node_modules/@types/jqueryui/index.d.ts" />
/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
/// <reference path="./node_modules/vuex/types/index.d.ts" />
/// <reference path="./node_modules/@types/jqueryui/index.d.ts" />
/// <reference path="./node_modules/@types/jasmine/index.d.ts" />
/// <reference path="./src/common/vue-plugin/ajax/Ajax.d.ts" />
/// <reference path="./src/common/vue-plugin/validator/Validator.d.ts" />
/// <reference path="./src/components/plugins/spinner/spinner.d.ts" />

declare var require: Function
declare var staticPath: string
declare var staticRoot: string

declare var cacheHost: string
declare var yoozoo: any
declare var HOST: {
  PAI: string
}
declare const CURRENT_DATA: string
declare module 'md5'
declare module 'vue-click-outside'
declare module "*.scss"
declare module "*.ejs"

declare module "*.vue" {
  import Vue from "vue";
  
  export default Vue;
}

interface JQuery {
  enscroll:{
      (options?:any): JQuery;
  }
}

interface EjsTpl {
  (data?: any): string;
}