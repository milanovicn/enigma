
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../dto/LoginRequest";
import { TagDTO } from "../dto/TagDTO";
import { TeamDTO } from "../dto/TeamDTO";
import { TermDTO } from "../dto/TermDTO";
import { UserDTO } from "../dto/UserDTO";


@Injectable()
export class AppService {

    adapter: any;

    constructor(private http: HttpClient) {
    }

    public getTags(): Observable<TagDTO[]> {
        return this.http.get<TagDTO[]>("/api/dictionary/tag");
    }

    public getTerms(): Observable<TermDTO[]> {
        return this.http.get<TermDTO[]>("/api/dictionary/term");
    }

    public getTeams(): Observable<TeamDTO[]> {
        return this.http.get<TeamDTO[]>("/api/dictionary/team");
    }

    public getSession(): Observable<UserDTO> {
        return this.http.get<UserDTO>("/api/dictionary/user/session");
    }

    public login(loginRequest: LoginRequest) {
        return this.http.post<Response>("/api/dictionary/user/login", loginRequest);
    }

    public logout(request: Request) {
        return this.http.post("/api/dictionary/user/logout", request);
    }

    //nije implementirano na backu:
    public createTerm(termDTO: TermDTO) {
        return this.http.post<string>("/api/dictionary/term/createTerm", termDTO)//termDTO);
    }

    public createTag(tagDTO: TagDTO) {
        return this.http.post<TagDTO>("/api/dictionary/tag/createTag", tagDTO);
    }

}
