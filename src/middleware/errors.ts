import { Response } from 'express';

const email = process.env.EMAIL_ADDRESS

const frontendLocation = process.env.FRONT_END_LOCATION

const siteName = process.env.SITE_NAME

const host = process.env.HOST


export const errorJson = (res: Response, code = 404, message?: string) => {

  let error = ""

  switch (code) {

    case 400: error = 'Your request is invalid'; break;

    case 401: error = 'You are unauthorized'; break;

    case 402: error = 'Payment is required'; break;

    case 403: error = 'Unfortunately, this is forbidden'; break;

    case 404: error = 'The resource you are looking for does not yet exist'; break;

    case 405: error = 'Method not allowed'; break;

    case 408: error = 'Request Timeout'; break;

    case 500: error = 'Our server has some issues apparently'; break;

    case 501: error = 'Await me in the future'; break;

    case 502: error = 'Gateway issues'; break;

    case 503: error = 'Service is currently unavailable'; break;

    case 504: error = 'Gateway Timeout'; break;

    default: error = "Unknown Code"; break;

  }

  if (message) error = `${error}. ${message}`

  return res.status(code).send({ error })

}

export const errorHtml = (res: Response, code = 404) => {

  let error = ""

  switch (code) {

    case 400: error = 'Your request is invalid'; break;

    case 401: error = 'You are unauthorized to view this page'; break;

    case 402: error = 'Payment is required'; break;

    case 403: error = 'Unfortunately, this is forbidden'; break;

    case 404: error = 'The resource you are looking for does not yet exist'; break;

    case 405: error = 'Method not allowed'; break;

    case 408: error = 'Request Timeout'; break;

    case 500: error = 'Our server has some issues apparently'; break;

    case 501: error = 'Await me in the future'; break;

    case 502: error = 'Gateway issues'; break;

    case 503: error = 'Service Unavailable'; break;

    case 504: error = 'Gateway Timeout'; break;

    default: error = `Unknown Code`; break;

  }

  return res.status(code).render("404", {

    title: `${code} Error Page`, email, host,

    siteName, frontendLocation, code, error,

    complainLink: `/complain`, homeLink: "/"

  })

}