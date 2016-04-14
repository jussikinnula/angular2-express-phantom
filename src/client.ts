import { enableProdMode, provide } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { APP_BASE_HREF, ROUTER_PROVIDERS } from "angular2/router";

// App component
import { AppComponent } from "./client/components/app/app.component";

// Service providers
import { SERVICE_PROVIDERS } from "./client/services/providers";

// global styles
import "./styles/styles.scss";


if (process.env.NODE_ENV === "production") {
    enableProdMode();
}


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    SERVICE_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: "/"})
]).catch((error: Error) => console.error(error));
