import { notification } from 'antd';

export function raiseError(error: any) {
    return notification['error']({
        message: "Erreur d'accès à l'API Twitter",
        description: 'errors' in error ?
                `${error.errors[0].message} code: ${error.errors[0].code}` :  // Twitter API error 
                "Problème d'accès à l'api réseau ou réponse invalide"         // non-API error, e.g. network problem or invalid JSON in response
    });
}