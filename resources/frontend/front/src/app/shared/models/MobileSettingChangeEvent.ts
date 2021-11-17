import { MobileSetting } from './mobile-setting.model';
export class MobileSettingChangeEvent {
    public tabid: number;
    public setting: MobileSetting;
    public component: string;
}
