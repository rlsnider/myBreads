const React = require('react')
const Default = require('./layouts/Default')

function error404 () {
    
    return (
        <Default>
            <h3>Error 404</h3>
            <p>
              Opps, you have come to a page that does not exist or has not been created yet.
            </p>
            <img src="" alt="404 Page" />
        </Default>
    )
}
module.exports = error404