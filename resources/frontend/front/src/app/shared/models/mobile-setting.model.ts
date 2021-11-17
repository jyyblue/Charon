export class MobileSetting {
    constructor() {
        this.introPage = new IntroPage();
    }
    public introPage: IntroPage;
    public startModelPage: StartModelPage;
    public tipPage: TipPage;
    public castingPage: CastingPage;
    public privacyPage: PrivacyPage;
    public welcomePage: WelcomePage;
}

export class IntroPage {
    constructor() {
        this.pageTitle = '';
        this.videoUrl = '';
        this.thumbUrl = '';
        this.videoTitle = '';
        this.videoDescription = '';
        this.pageDescription = '';
    }

    public pageTitle: string;
    public videoUrl: string;
    public thumbUrl: string;
    public videoTitle: string;
    public videoDescription: string;
    public pageDescription: string;
}

export class StartModelPage {
    constructor(description) {
        this.description = description;
    }
    public description = '';
}

export class TipPage {
    constructor(description) {
        this.description = description;
    }
    public description = '';
}

export class CastingPage {
    constructor(description) {
        this.description = description;
    }
    public description = '';
}

export class PrivacyPage {
    constructor(description) {
        this.description = description;
    }
    public description = '';
}

export class WelcomePage {
    constructor(description) {
        this.description = description;
    }
    public description = '';
}
