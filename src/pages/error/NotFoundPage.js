import React from 'react';

import ErrorLayout from '../../components/layout/ErrorLayout';

// Component
function NotFoundPage() {
    // Data
    const code = 404;
    const title = "Oops! Page introuvable";
    const description = `
                            Désolé mais la page que vous recherchez n'esiste pas,
                            a été rétirée, a changée de nom ou est 
                            temporairement indisponible.
                        `;
    // Render
    return <ErrorLayout code={code} title={title} description={description} />
}

export default React.memo(NotFoundPage)