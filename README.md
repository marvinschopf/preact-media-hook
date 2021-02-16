# preact-media-hook

[![npm version](https://img.shields.io/npm/v/preact-media-hook.svg)](https://www.npmjs.com/package/preact-media-hook)
[![npm downloads](https://img.shields.io/npm/dt/preact-media-hook.svg)](https://www.npmjs.com/package/preact-media-hook)

Preact Hook for Media Queries. 
Uses [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API.

## Installation

Install it with yarn:

```
yarn add preact-media-hook
```

Or with npm:

```
npm i preact-media-hook --save
```

## Usage

Pass query to *useMediaPredicate*:

```javascript
import { Component } from "preact";
import { useMediaPredicate } from "preact-media-hook";

const Component = () => {
    const biggerThan400 = useMediaPredicate("(min-width: 400px)");
    
    return <div>
        {biggerThan400 && <button>SomeButton</button>}
    </div>
};

```

## API

#### `useMedia(query: string)`
Returns *undefined* (for example, in Node.js environment 
where *mathMedia* is not defined), or object, simular to *mathMedia(...)* result:
```javascript
{
    matches: boolean,
    media: string
}
```

#### `useMediaPredicate(query: string)`
Returns just *true* or *false*.