interface IPlatform {
  _id?: string;
  name?: string;
  description?: string;
  url?: string;
  materials?: string;
}

interface IPlatformForm extends IPlatform {}

export type { IPlatform, IPlatformForm };
