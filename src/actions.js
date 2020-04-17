import getSeries from './api/getSeries';
import _ from 'lodash';

export const asyncData = async ({ dispatch }) => {
  dispatch({
    type: 'SET_IS_LOADING',
    payload: true,
  });

  let data = await getSeries();

  if (!!data && !!data.series && !!data.series[0] && !!data.series[0].data) {
    const series = data.series[0].data;

    const dataSort = _.sortBy(series, (s = []) => s[1]);

    let less = null;
    let higher = null;

    if (!!dataSort && !!dataSort.length) {
      less = { date: dataSort[0][0], generation: dataSort[0][1] };

      higher = {
        date: dataSort[dataSort.length - 1][0],
        generation: dataSort[dataSort.length - 1][1],
      };

      const newData = dataSort.map((d = []) => ({
        date: d[0],
        generation: d[1],
        units: 'kWh',
        higher,
        less,
      }));

      dispatch({
        type: 'SET_DATA',
        payload: newData,
      });
    }
  } else {
    dispatch({ type: 'SET_DATA', payload: [] });
  }

  dispatch({
    type: 'SET_IS_LOADING',
    payload: false,
  });
};
