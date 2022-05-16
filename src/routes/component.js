import {
    SvelteComponent,
    detach,
    element,
    init,
    insert,
    noop,
    safe_not_equal
  } from "svelte/internal";
  
  function create_fragment(ctx) {
    let p;
  
    return {
      c() {
        p = element("p");
        p.textContent = "test";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) detach(p);
      }
    };
  }
  
  class Component extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment, safe_not_equal, {});
    }
  }
  
//   export default Component;
import Error from './_Error.svelte'

console.log(Error)


export default class extends Component {
    constructor(config) {
        console.log("constructor", config)
        super(config)
    }
}