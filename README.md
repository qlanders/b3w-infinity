# React infinity Scroll

## Install

    $ yarn add @b3w/infinity

## Example

```js
import Infinity from '@b3w/infinity';

const App = () => {
    const [hasMore, setHasMore] = useState(true);
    // fetch & fetchMore functions here

    return (
        <div>
            <Infinity
                fetchMore={fetchMore}
                hasMore={hasMore}
                loaderComp={<div>Loading...</div>}
            >
                {items.map((i) => (
                    <div key={i.id}>
                        {i.text}
                    </div> 
                ))}
            </Infinity>
        </div>
    );
}

```
