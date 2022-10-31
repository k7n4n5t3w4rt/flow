// @flow
/*::
type AnimeOptions = {
          targets: any,
          x: [ any ],
          z: [ any ],
          y: [ any ],
          delay: number,
          easing: string,
          complete: (any) => void
        }
		*/

export default (options /*: AnimeOptions */) /*: void */ => {
  options.complete();
};
