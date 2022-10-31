// @flow
/* eslint-env browser */

export function bubbleSortFactory(
  {
    CONTAINER_ID = "",
    SHOW_WORKING = true,
    FPS = 10,
    ACCELLERATION = 100,
    CLICK = 1,
    COLS = 3,
    ROWS = 3,
    MAX_SECONDS_TRANSITION_INTERVAL = 1,
    CONSTANT_TRANSITION_SPEED = false,
    LOOP = true,
    RELOAD_INTERVAL = 1000,
  } /*: Object */,
  gridDisplay /*: function */,
) /*: Object */ {
  const config = {
    CONTAINER_ID,
    SHOW_WORKING,
    FPS,
    ACCELLERATION,
    CLICK,
    COLS,
    ROWS,
    MAX_SECONDS_TRANSITION_INTERVAL,
    CONSTANT_TRANSITION_SPEED,
    LOOP,
    RELOAD_INTERVAL,
  };
  // The display
  const D = gridDisplay();
  config.CLICK = D.getClick(
    config.SHOW_WORKING,
    config.FPS,
    config.ACCELLERATION,
  );

  function run() /*: void */ {
    // The input
    const a = makeArrayToSort(config.COLS, config.ROWS);
    D.displayGrid(a, config.COLS, config.ROWS, config.CONTAINER_ID);
    D.enableShowWorkingToggleControl(config);
    // The algorithm
    loop(a, 1, a.length);
  }

  function loop(
    a /*: Array<Object> */,
    i /*: number */,
    end /*: number */,
  ) /* void */ {
    if (end > 1) {
      D.setCellDisplay(
        i,
        "add",
        "active",
        config.CONTAINER_ID,
        config.SHOW_WORKING,
      );
      swap(a, i - 1, i).then((a) => {
        D.setCellDisplay(
          i,
          "remove",
          "active",
          config.CONTAINER_ID,
          config.SHOW_WORKING,
        );
        D.setCellDisplay(
          i - 1,
          "remove",
          "min",
          config.CONTAINER_ID,
          config.SHOW_WORKING,
        );
        // Normally, just increment i
        ++i;
        // Except if we're at the end, in which
        // case start again
        if (end === i) {
          end = i - 1;
          i = 1;
        }
        pauseAndLoop(a, i, end);
      });
    } else if (config.LOOP) {
      return reloadIfFinishedLooping(config.RELOAD_INTERVAL);
    }
  }

  function reloadIfFinishedLooping(reloadInterval /*: number */) /*: void */ {
    setReload(reloadInterval);
  }

  function toggleShowWorking() /*: void */ {
    config.SHOW_WORKING = !config.SHOW_WORKING;
    config.CLICK = D.getClick(
      config.SHOW_WORKING,
      config.FPS,
      config.ACCELLERATION,
    );
    D.clearShowWorkingCellsDisplay(
      config.COLS,
      config.ROWS,
      config.CONTAINER_ID,
    );
  }

  function pauseAndLoop(
    a /*: Array<Object> */,
    i /*: number */,
    end /*: number */,
  ) /*: void */ {
    setTimeout(() => {
      loop(a, i, end);
    }, config.CLICK * 1);
  }

  function swap(
    a /*: Array<Object> */,
    _1 /*: number */,
    _2 /*: number */,
  ) /*: Promise<Array<Object>> */ {
    return setDisplayOnPreviousElement(a, _1).then(() => {
      return checkCurrentWithPrevious(a, _1, _2)
        .then((a) => {
          return D.swapCells(
            a,
            _1,
            _2,
            config.CONTAINER_ID,
            config.CONSTANT_TRANSITION_SPEED,
            config.MAX_SECONDS_TRANSITION_INTERVAL,
            config.COLS,
            config.ROWS,
          ).then((a) => {
            return swapArrayElements(a, _1, _2);
          });
        })
        .catch((e) => {
          return Promise.resolve(a);
        });
    });
  }

  function setDisplayOnPreviousElement(
    a /*: Array<Object> */,
    _1 /*: number */,
  ) /*: Promise<Array<Object>> */ {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        D.setCellDisplay(
          _1,
          "add",
          "actively-looking",
          config.CONTAINER_ID,
          config.SHOW_WORKING,
        );
        return resolve(a);
      }, config.CLICK * 1);
    });
  }

  function checkCurrentWithPrevious(
    a /*: Array<Object> */,
    _1 /*: number */,
    _2 /*: number */,
  ) /*: Promise<Array<Object>> */ {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (a[_1].value > a[_2].value) {
          D.setCellDisplay(
            _1,
            "remove",
            "actively-looking",
            config.CONTAINER_ID,
            config.SHOW_WORKING,
          );
          D.setCellDisplay(
            _1,
            "add",
            "min",
            config.CONTAINER_ID,
            config.SHOW_WORKING,
          );
          return resolve(a);
        } else {
          D.setCellDisplay(
            _1,
            "remove",
            "actively-looking",
            config.CONTAINER_ID,
            config.SHOW_WORKING,
          );
          return reject(a);
        }
      }, config.CLICK * 1);
    });
  }

  function swapArrayElements(
    a /*: Array<Object> */,
    _1 /*: number */,
    _2 /*: number */,
  ) {
    const tmpValue = a[_1].value;
    a[_1].value = a[_2].value;
    a[_2].value = tmpValue;
    return a;
  }

  function makeArrayToSort(
    cols /*: number */,
    rows /*: number */,
  ) /*: Array<Object> */ {
    const numItems = cols * rows;
    const a = [];
    let randomNumber = 0;
    for (let i = 0; i < numItems; i++) {
      randomNumber = Math.random();
      a.push({
        value: randomNumber,
        id: "_" + i.toString(),
      });
    }
    return a;
  }

  function setReload(reloadInterval /*: number */) /*: void */ {
    setTimeout(() => {
      run();
    }, reloadInterval);
  }

  return {
    config,
    run,
    loop,
    pauseAndLoop,
    swap,
    swapArrayElements,
    setDisplayOnPreviousElement,
    checkCurrentWithPrevious,
    makeArrayToSort,
    setReload,
    toggleShowWorking,
  };
}
