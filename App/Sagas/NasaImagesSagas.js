import { call, put } from 'redux-saga/effects'
import NasaImagesActions from '../Redux/NasaImagesRedux'

export function* getNasaImages(api, action) {
  const { searchTerm } = action
  var response = yield call(api.getImages, searchTerm)

  if (response.ok) {
    //add id for each object
    response = response.data.collection.items.map((data, index) => (
      {
        ...data,
        id: index
      }))
    yield put(NasaImagesActions.nasaImagesSuccess(response))
  } else {
    yield put(NasaImagesActions.nasaImagesFailure())
  }
}