# Rick and Morty Provider

This Library will expose API info about Rick and Morty Series in a wrapped provider

Provider: Wrap your app into a `RickAndMortyProvider`

```js
import { RickAndMortyProvider } from 'rick-and-morty-lib';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RickAndMortyProvider >
      <App />
    </RickAndMortyProvider>
  </StrictMode>,
)
```

- Extract data and callbacks from the context and use it into your froontend app.

```js
// eslint.config.js
import { useRickAndMortyContext } from 'rick-and-morty-lib';

const { page, loading, error, data, loadMore } = useRickAndMortyContext();
```
