import React from 'react';

import ErrorLayout from '../../components/layout/ErrorLayout';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        if(process.env.NODE_ENV !== 'production') console.log({error});
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        return { hasError: true };
        //logComponentStackToMyService(info.componentStack);
    }

    render() {
        // Data
        const code = 500;
        const title = "Oops! Erreur interne du serveur";
        const description = `
                            Une erreur s'est produite l'ors de l'exécution du script.
                            Bien vouloir contacter l'administateur pour plus d'informations.
                        `;
        if (this.state.hasError) {
            return <ErrorLayout code={code} title={title} description={description}/>;
        }
        return this.props.children;
    }
}

export default React.memo(ErrorBoundary)