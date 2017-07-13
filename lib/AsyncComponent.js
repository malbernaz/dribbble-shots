import { Component } from "preact";

export default class AsyncComponent extends Component {
  constructor(props, context) {
    super(props, context);
    let lock = false;
    const doRender = this.render;
    const renderAsync = () => doRender.call(this, this.props, this.state, this.context);
    const handleRender = vdom => {
      this._asyncRendered = vdom;
      lock = true;
      this.forceUpdate();
      lock = false;
    };
    this.render = () => {
      if (!lock) {
        Promise.resolve(null).then(renderAsync).then(handleRender);
      }
      return this._asyncRendered || null;
    };
  }
}
