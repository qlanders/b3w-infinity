# React infinity Scroll

## Install

    $ yarn add @b3w/infiniti

## Example

```js
import Infinity from '@b3w/infiniti';

const App = () => {
    const [hasMore, setHasMore] = useState(true);
    // fetch & fetchMore functions here

    return (
        <div>
            <Infiniti
                fetchMore={fetchMore}
                hasMore={hasMore}
                loaderComp={<div>Loading...</div>}
            >
                {items.map((i) => (
                    <div key={i.id}>
                        {i.text}
                    </div> 
                ))}
            </Infiniti>
        </div>
    );
}

```
