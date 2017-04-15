import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth.service';
import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async(() => {
    const loggedIn = new BehaviorSubject(false);
    const userInfo = new BehaviorSubject({});

    TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [MaterialModule,NoopAnimationsModule],
      providers: [
        {
          provide: AuthService, useValue: {
            isLoggedIn: () => loggedIn.asObservable(),
            setLoggedIn: status => loggedIn.next(status),
            getUserInfo: () => userInfo.asObservable(),
            setUserInfo: info => userInfo.next(info),
            logout: jasmine.createSpy('logout')
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display anything when not logged in', () => {
    expect(fixture.debugElement.children.length).toBe(0);
  });

  describe('when logged in', () => {
    let auth;

    beforeEach(() => {
      auth = TestBed.get(AuthService);
      auth.setLoggedIn(true);
      auth.setUserInfo({
        name: 'User Name',
        photoUrl: 'photo.png'
      });
      fixture.detectChanges();
    });

    it('should display user name when logged in', () => {
      expect(fixture.debugElement.query(By.css('span')).nativeElement.innerText).toEqual('User Name');
    });

    it('should display the user photo', () => {
      expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toMatch(/\/photo.png$/);
    });

    it('should call logout on the AuthService when clicking the menu', () => {
      fixture.debugElement.query(By.css('button[md-icon-button]')).triggerEventHandler('click', null);
      fixture.detectChanges();
      fixture.debugElement.query(By.css('button[md-menu-item]')).triggerEventHandler('click', null);
      expect(auth.logout).toHaveBeenCalled();
    });
  });
});
