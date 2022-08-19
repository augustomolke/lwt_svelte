import { now } from 'moment';
import store from '../store';
export const trackMouseOver = (
  node,
  { onMouseOver, onMouseLeave, includeNode }
) => {
  const mouseOver = () => {
    // Start the timer
    onMouseOver();
  };

  const getElement = (e) => {
    const elementFromPoint = document.elementFromPoint(e.x, e.y);
    return elementFromPoint;
  };

  const trackMouse = (e) => {
    store.update((u) => {
      const elementFromPoint = getElement(e);

      return {
        ...u,
        currentNode: elementFromPoint,
      };
    });
  };

  const scrollHandler = () => {
    onMouseLeave();
  };

  const mouseNotOver = (eSource) => {
    // Stop the timer
    if (eSource.toElement !== includeNode) {
      onMouseLeave();
    } else {
      eSource.toElement.addEventListener(
        'mouseleave',
        function (eTarget) {
          if (eTarget.toElement !== eSource.target.firstChild) {
            onMouseLeave();
          }
        },
        { once: true }
      );
    }
  };

  const addListeners = () => {
    document.addEventListener('scroll', scrollHandler);
    node.addEventListener('mouseover', mouseOver);
    node.addEventListener('focus', mouseOver);
    node.addEventListener('mouseleave', mouseNotOver);
    node.addEventListener('mousemove', trackMouse);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
      node.removeEventListener('mouseover', mouseOver);
      node.removeEventListener('mouseleave', mouseNotOver);
      node.removeEventListener('focus', mouseOver);
      node.removeEventListener('mousemove', trackMouse);
    };
  };

  const removeListeners = addListeners();

  return {
    destroy() {
      removeListeners();
    },
    update({ includeNode: newIncludeNode }) {
      includeNode = newIncludeNode;
    },
  };
};
