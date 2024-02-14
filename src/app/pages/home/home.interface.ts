
export interface responseSentientsComments {
    comments:              Comment[];
    distribution_comments: DistributionComments;
}

export interface Comment {
    authorDisplayName: string;
    sentiment:         string;
    textOriginal:      string;
    textPreprocess:    string;
}

export interface DistributionComments {
    NEG: number;
    NEU: number;
    POS: number;
}

