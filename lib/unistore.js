import { Component } from "preact";

export default function createStore(state = {}) {
  let listeners = [];
  return {
    setState(update) {
      state = { ...state, ...update };
      listeners.forEach(f => f(state));
    },
    subscribe(f) {
      listeners.push(f);
    },
    unsubscribe(f) {
      let i = listeners.indexOf(f);
      listeners.splice(i, !!~i);
    },
    getState() {
      return state;
    }
  };
}

export function connect(mapToProps) {
  return Child =>
    class Connected extends Component {
      state = this.getProps();
      update = () => {
        let mapped = this.getProps();
        if (!shallowEqual(mapped, this.state)) {
          this.setState(mapped);
        }
      };
      getProps() {
        let state = (this.context.store && this.context.store.getState()) || {};
        return mapToProps(state, this.props);
      }
      componentWillMount() {
        this.context.store.subscribe(this.update);
      }
      componentWillUnmount() {
        this.context.store.unsubscribe(this.update);
      }
      render(props, state, context) {
        return <Child store={context.store} {...props} {...state} />;
      }
    };
}

function shallowEqual(a, b) {
  for (let i in a) if (a[i] !== b[i]) return false;
  for (let i in b) if (!(i in a)) return false;
  return true;
}
