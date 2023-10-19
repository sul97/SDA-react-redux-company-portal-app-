export interface CompanyType {
    login: string
    id: number
    node_id: string
    url: string
    repos_url: string
    events_url: string
    hooks_url: string
    issues_url: string
    members_url: string
    public_members_url: string
    avatar_url: string
    description?: string | null
  };
  export interface InitialState {
    data: CompanyType[]; 
    isLoading: boolean;
    error: string | null;
    singleCompany: null | CompanyType
  };

type sortCompaniesAction = {
    type:'companies/sortCompanies'
    payload: string;
};

export type CompaniesAction = sortCompaniesAction;
