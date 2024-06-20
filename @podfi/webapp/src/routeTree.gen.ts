/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as pagePageImport } from './routes/(page)/_page'
import { Route as pagePageIndexImport } from './routes/(page)/_page/index'
import { Route as pagePageEarningImport } from './routes/(page)/_page/earning'
import { Route as pagePageCreateLivestreamImport } from './routes/(page)/_page/create-livestream'
import { Route as pagePagePodcastsIndexImport } from './routes/(page)/_page/podcasts/index'
import { Route as pagePagePodcastsIdImport } from './routes/(page)/_page/podcasts/$id'
import { Route as pagePageCreatorUsernameUploadEpisodeImport } from './routes/(page)/_page/$creatorUsername/upload-episode'
import { Route as pagePageCreatorUsernameCreatePodcastImport } from './routes/(page)/_page/$creatorUsername/create-podcast'
import { Route as pagePageCreatorUsernameActivePodcastImport } from './routes/(page)/_page/$creatorUsername/$activePodcast'
import { Route as pagePageProfileUsernameIndexImport } from './routes/(page)/_page/profile/$username/index'
import { Route as pagePageProfileUsernameCreateImport } from './routes/(page)/_page/profile/$username/create'

// Create Virtual Routes

const pageImport = createFileRoute('/(page)')()

// Create/Update Routes

const pageRoute = pageImport.update({
  id: '/(page)',
  getParentRoute: () => rootRoute,
} as any)

const pagePageRoute = pagePageImport.update({
  id: '/_page',
  getParentRoute: () => pageRoute,
} as any)

const pagePageIndexRoute = pagePageIndexImport.update({
  path: '/',
  getParentRoute: () => pagePageRoute,
} as any)

const pagePageEarningRoute = pagePageEarningImport.update({
  path: '/earning',
  getParentRoute: () => pagePageRoute,
} as any)

const pagePageCreateLivestreamRoute = pagePageCreateLivestreamImport.update({
  path: '/create-livestream',
  getParentRoute: () => pagePageRoute,
} as any)

const pagePagePodcastsIndexRoute = pagePagePodcastsIndexImport.update({
  path: '/podcasts/',
  getParentRoute: () => pagePageRoute,
} as any)

const pagePagePodcastsIdRoute = pagePagePodcastsIdImport.update({
  path: '/podcasts/$id',
  getParentRoute: () => pagePageRoute,
} as any)

const pagePageCreatorUsernameUploadEpisodeRoute =
  pagePageCreatorUsernameUploadEpisodeImport.update({
    path: '/$creatorUsername/upload-episode',
    getParentRoute: () => pagePageRoute,
  } as any)

const pagePageCreatorUsernameCreatePodcastRoute =
  pagePageCreatorUsernameCreatePodcastImport.update({
    path: '/$creatorUsername/create-podcast',
    getParentRoute: () => pagePageRoute,
  } as any)

const pagePageCreatorUsernameActivePodcastRoute =
  pagePageCreatorUsernameActivePodcastImport.update({
    path: '/$creatorUsername/$activePodcast',
    getParentRoute: () => pagePageRoute,
  } as any)

const pagePageProfileUsernameIndexRoute =
  pagePageProfileUsernameIndexImport.update({
    path: '/profile/$username/',
    getParentRoute: () => pagePageRoute,
  } as any)

const pagePageProfileUsernameCreateRoute =
  pagePageProfileUsernameCreateImport.update({
    path: '/profile/$username/create',
    getParentRoute: () => pagePageRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(page)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof pageImport
      parentRoute: typeof rootRoute
    }
    '/(page)/_page': {
      id: '/_page'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof pagePageImport
      parentRoute: typeof pageRoute
    }
    '/(page)/_page/create-livestream': {
      id: '/_page/create-livestream'
      path: '/create-livestream'
      fullPath: '/create-livestream'
      preLoaderRoute: typeof pagePageCreateLivestreamImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/earning': {
      id: '/_page/earning'
      path: '/earning'
      fullPath: '/earning'
      preLoaderRoute: typeof pagePageEarningImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/': {
      id: '/_page/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof pagePageIndexImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/$creatorUsername/$activePodcast': {
      id: '/_page/$creatorUsername/$activePodcast'
      path: '/$creatorUsername/$activePodcast'
      fullPath: '/$creatorUsername/$activePodcast'
      preLoaderRoute: typeof pagePageCreatorUsernameActivePodcastImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/$creatorUsername/create-podcast': {
      id: '/_page/$creatorUsername/create-podcast'
      path: '/$creatorUsername/create-podcast'
      fullPath: '/$creatorUsername/create-podcast'
      preLoaderRoute: typeof pagePageCreatorUsernameCreatePodcastImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/$creatorUsername/upload-episode': {
      id: '/_page/$creatorUsername/upload-episode'
      path: '/$creatorUsername/upload-episode'
      fullPath: '/$creatorUsername/upload-episode'
      preLoaderRoute: typeof pagePageCreatorUsernameUploadEpisodeImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/podcasts/$id': {
      id: '/_page/podcasts/$id'
      path: '/podcasts/$id'
      fullPath: '/podcasts/$id'
      preLoaderRoute: typeof pagePagePodcastsIdImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/podcasts/': {
      id: '/_page/podcasts/'
      path: '/podcasts'
      fullPath: '/podcasts'
      preLoaderRoute: typeof pagePagePodcastsIndexImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/profile/$username/create': {
      id: '/_page/profile/$username/create'
      path: '/profile/$username/create'
      fullPath: '/profile/$username/create'
      preLoaderRoute: typeof pagePageProfileUsernameCreateImport
      parentRoute: typeof pagePageImport
    }
    '/(page)/_page/profile/$username/': {
      id: '/_page/profile/$username/'
      path: '/profile/$username'
      fullPath: '/profile/$username'
      preLoaderRoute: typeof pagePageProfileUsernameIndexImport
      parentRoute: typeof pagePageImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  pageRoute: pageRoute.addChildren({
    pagePageRoute: pagePageRoute.addChildren({
      pagePageCreateLivestreamRoute,
      pagePageEarningRoute,
      pagePageIndexRoute,
      pagePageCreatorUsernameActivePodcastRoute,
      pagePageCreatorUsernameCreatePodcastRoute,
      pagePageCreatorUsernameUploadEpisodeRoute,
      pagePagePodcastsIdRoute,
      pagePagePodcastsIndexRoute,
      pagePageProfileUsernameCreateRoute,
      pagePageProfileUsernameIndexRoute,
    }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/"
      ]
    },
    "/": {
      "filePath": "(page)",
      "children": [
        "/_page"
      ]
    },
    "/_page": {
      "filePath": "(page)/_page.tsx",
      "parent": "/",
      "children": [
        "/_page/create-livestream",
        "/_page/earning",
        "/_page/",
        "/_page/$creatorUsername/$activePodcast",
        "/_page/$creatorUsername/create-podcast",
        "/_page/$creatorUsername/upload-episode",
        "/_page/podcasts/$id",
        "/_page/podcasts/",
        "/_page/profile/$username/create",
        "/_page/profile/$username/"
      ]
    },
    "/_page/create-livestream": {
      "filePath": "(page)/_page/create-livestream.tsx",
      "parent": "/_page"
    },
    "/_page/earning": {
      "filePath": "(page)/_page/earning.tsx",
      "parent": "/_page"
    },
    "/_page/": {
      "filePath": "(page)/_page/index.tsx",
      "parent": "/_page"
    },
    "/_page/$creatorUsername/$activePodcast": {
      "filePath": "(page)/_page/$creatorUsername/$activePodcast.tsx",
      "parent": "/_page"
    },
    "/_page/$creatorUsername/create-podcast": {
      "filePath": "(page)/_page/$creatorUsername/create-podcast.tsx",
      "parent": "/_page"
    },
    "/_page/$creatorUsername/upload-episode": {
      "filePath": "(page)/_page/$creatorUsername/upload-episode.tsx",
      "parent": "/_page"
    },
    "/_page/podcasts/$id": {
      "filePath": "(page)/_page/podcasts/$id.tsx",
      "parent": "/_page"
    },
    "/_page/podcasts/": {
      "filePath": "(page)/_page/podcasts/index.tsx",
      "parent": "/_page"
    },
    "/_page/profile/$username/create": {
      "filePath": "(page)/_page/profile/$username/create.tsx",
      "parent": "/_page"
    },
    "/_page/profile/$username/": {
      "filePath": "(page)/_page/profile/$username/index.tsx",
      "parent": "/_page"
    }
  }
}
ROUTE_MANIFEST_END */