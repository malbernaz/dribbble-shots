import { Component } from "preact";

export default WrappedComponent =>
  class Animated extends Component {
    static defaultProps = { timeout: 600, hooks: [] };

    componentDidMount() {
      this.base.addEventListener("animationstart", this.callAnimationHooks, false);
    }

    componentWillUnmount() {
      this.base.removeEventListener("animationstart", this.callAnimationHooks);
    }

    componentWillEnter(cb) {
      this.base.classList.remove("transition-leave");
      this.base.classList.add("transition-enter");
      cb();
    }

    componentWillLeave(cb) {
      this.base.classList.remove("transition-enter");
      this.base.classList.add("transition-leave");
      setTimeout(cb, this.props.timeout);
    }

    callAnimationHooks = e => {
      if (
        this.base.classList.contains("transition-enter") &&
        !this.base.classList.contains("transition-leave") &&
        e.target.id === "animated"
      ) {
        this.props.onTransitionEnd();
      }
    };

    render(props) {
      return <WrappedComponent {...props} />;
    }
  };
