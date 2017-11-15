/**
 * Created by jiangyukun on 2017/6/30.
 */
export let context = ''

export function getPathPrefix() {
  if (process.env.NODE_ENV == 'production') {
    return context + '/'
  }
  if (process.env.NODE_ENV == 'inline') {
    return context + '/inline/'
  }
  if (process.env.NODE_ENV == 'dev') {
    return '/dev/'
  }
}

export function getPath(page) {
  return getPathPrefix() + page
}

export let browserParams = {
  scrollWidth: 0
}